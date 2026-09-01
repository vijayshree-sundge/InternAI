using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;
using InternAI.Api.Models;
using InternAI.Api.Services;

namespace InternAI.Api.Controller;

[Authorize]
[ApiController]
[Route("api/tasks")]
public class SubmissionsController : ControllerBase {
    private readonly AppDbContext _db;
    private readonly AiServiceClient _ai;
    public SubmissionsController(AppDbContext db, AiServiceClient ai) { _db = db; _ai = ai; }

    private int CurrentUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost("{taskId}/messages")]
    public async Task<IActionResult> PostMessage(int taskId, MessageDto dto) {
        var msg = new SubmissionMessage {
            TaskItemId = taskId,
            SenderUserId = CurrentUserId(),
            Content = dto.Content,
            Type = dto.Type,
            SentAt = DateTime.UtcNow
        };
        _db.Messages.Add(msg);
        await _db.SaveChangesAsync();

        if (dto.Type == "code") {
            try {
                var result = await _ai.EvaluateAsync(dto.Content, "python");

                var submission = new Submission {
                    TaskItemId = taskId,
                    Code = dto.Content,
                    SubmittedAt = DateTime.UtcNow
                };
                _db.Submissions.Add(submission);
                await _db.SaveChangesAsync();

                _db.Evaluations.Add(new Evaluation {
                    SubmissionId = submission.Id,
                    LogicScore = result.Logic,
                    StyleScore = result.Style,
                    PracticesScore = result.Practices,
                    TotalScore = result.Total,
                    Feedback = string.Join("; ", result.Suggestions)
                });

                var feedbackMsg = new SubmissionMessage {
                    TaskItemId = taskId,
                    SenderUserId = 0,
                    Content = $"Score: {result.Total}/100 (Logic: {result.Logic}, Style: {result.Style}, Practices: {result.Practices})\n" +
                              string.Join("\n", result.Suggestions.Select(s => "\u2022 " + s)),
                    Type = "ai_feedback",
                    SentAt = DateTime.UtcNow
                };
                _db.Messages.Add(feedbackMsg);
                await _db.SaveChangesAsync();
            } catch (Exception ex) {
                var errorMsg = new SubmissionMessage {
                    TaskItemId = taskId,
                    SenderUserId = 0,
                    Content = "AI evaluation is currently unavailable. Please try again shortly.",
                    Type = "ai_feedback",
                    SentAt = DateTime.UtcNow
                };
                _db.Messages.Add(errorMsg);
                await _db.SaveChangesAsync();
                Console.WriteLine($"AI evaluation failed: {ex.Message}");
            }
        }

        return Ok(msg);
    }

    [HttpGet("{taskId}/messages")]
    public async Task<IActionResult> GetThread(int taskId) =>
        Ok(await _db.Messages.Where(m => m.TaskItemId == taskId).OrderBy(m => m.SentAt).ToListAsync());
}