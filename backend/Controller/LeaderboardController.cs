using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;

namespace InternAI.Api.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LeaderboardController : ControllerBase {
    private readonly AppDbContext _db;
    public LeaderboardController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetLeaderboard() {
        var interns = await _db.Users.Where(u => u.Role == "Intern").ToListAsync();
        var result = new List<object>();

        foreach (var intern in interns) {
            var taskIds = await _db.Tasks
                .Where(t => t.AssignedToUserId == intern.Id)
                .Select(t => t.Id)
                .ToListAsync();

            var submissionIds = await _db.Submissions
                .Where(s => taskIds.Contains(s.TaskItemId))
                .Select(s => s.Id)
                .ToListAsync();

            var avgScore = await _db.Evaluations
                .Where(e => submissionIds.Contains(e.SubmissionId))
                .AverageAsync(e => (double?)e.TotalScore) ?? 0;

            result.Add(new { userId = intern.Id, name = intern.Name, avgScore = Math.Round(avgScore, 1) });
        }

        var ranked = result
            .Select(r => (dynamic)r)
            .OrderByDescending(r => r.avgScore)
            .ToList();

        return Ok(ranked);
    }
}
