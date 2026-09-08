using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;
using InternAI.Api.Models;

namespace InternAI.Api.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase {
    private readonly AppDbContext _db;
    public AttendanceController(AppDbContext db) { _db = db; }

    [Authorize(Roles = "Manager")]
    [HttpPost("mark")]
    public async Task<IActionResult> Mark(MarkAttendanceDto dto) {
        var existing = await _db.Attendances
            .FirstOrDefaultAsync(a => a.UserId == dto.UserId && a.Date == dto.Date);

        if (existing != null) {
            existing.Status = dto.Status;
            existing.Note = dto.Note;
        } else {
            _db.Attendances.Add(new Attendance {
                UserId = dto.UserId, Date = dto.Date, Status = dto.Status, Note = dto.Note
            });
        }
        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetForUser(int userId) =>
        Ok(await _db.Attendances.Where(a => a.UserId == userId).OrderBy(a => a.Date).ToListAsync());
}
