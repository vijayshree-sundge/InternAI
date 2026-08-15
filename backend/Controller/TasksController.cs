using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;
using InternAI.Api.Models;

namespace InternAI.Api.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase {
    private readonly AppDbContext _db;
    public TasksController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Tasks.ToListAsync());

    [HttpGet("mine/{userId}")]
    public async Task<IActionResult> GetMine(int userId) =>
        Ok(await _db.Tasks.Where(t => t.AssignedToUserId == userId).ToListAsync());

    [Authorize(Roles = "Manager")]
    [HttpPost]
    public async Task<IActionResult> Create(TaskCreateDto dto) {
        var task = new TaskItem {
            Title = dto.Title, Description = dto.Description, Type = dto.Type,
            Deadline = dto.Deadline, AssignedToUserId = dto.AssignedToUserId ?? 0,
            Status = "ToDo"
        };
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();
        return Ok(task);
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("assign-batch/{batchId}")]
    public async Task<IActionResult> AssignToBatch(int batchId, TaskCreateDto dto) {
        var interns = await _db.Users.Where(u => u.BatchId == batchId && u.Role == "Intern").ToListAsync();
        var tasks = interns.Select(i => new TaskItem {
            Title = dto.Title, Description = dto.Description, Type = dto.Type,
            Deadline = dto.Deadline, AssignedToUserId = i.Id, Status = "ToDo"
        });
        await _db.Tasks.AddRangeAsync(tasks);
        await _db.SaveChangesAsync();
        return Ok(new { assignedCount = interns.Count });
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status) {
        var task = await _db.Tasks.FindAsync(id);
        if (task is null) return NotFound();
        task.Status = status;
        await _db.SaveChangesAsync();
        return Ok(task);
    }
}
