using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;

namespace InternAI.Api.Controller;

[Authorize(Roles = "Manager")]
[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase {
    private readonly AppDbContext _db;
    public StatsController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetStats() {
        return Ok(new {
            totalInterns = await _db.Users.CountAsync(u => u.Role == "Intern"),
            activeTasks = await _db.Tasks.CountAsync(t => t.Status != "Done"),
            avgScore = await _db.Evaluations.AverageAsync(e => (double?)e.TotalScore) ?? 0
        });
    }

    [HttpGet("by-batch")]
    public async Task<IActionResult> GetStatsByBatch() {
        var result = await _db.Users
            .Where(u => u.Role == "Intern" && u.BatchId != null)
            .GroupBy(u => u.BatchId)
            .Select(g => new {
                batchId = g.Key,
                internCount = g.Count()
            })
            .ToListAsync();
        return Ok(result);
    }
}
