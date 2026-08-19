using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;
using InternAI.Api.Models;

namespace InternAI.Api.Controller;

[Authorize]
[ApiController]
[Route("api/tasks")]
public class SubmissionsController : ControllerBase {
    private readonly AppDbContext _db;
    public SubmissionsController(AppDbContext db) { _db = db; }

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

        // Day 12 will hook real AI evaluation here; for now, mark the trigger point.
        if (dto.Type == "code") {
            // TODO Day 12: call AI service, post ai_feedback message back into thread
        }

        return Ok(msg);
    }

    [HttpGet("{taskId}/messages")]
    public async Task<IActionResult> GetThread(int taskId) =>
        Ok(await _db.Messages.Where(m => m.TaskItemId == taskId).OrderBy(m => m.SentAt).ToListAsync());
}