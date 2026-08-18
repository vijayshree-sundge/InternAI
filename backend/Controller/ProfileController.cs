using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InternAI.Api.Data;
using InternAI.Api.Models;

namespace InternAI.Api.Controller;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase {
    private readonly AppDbContext _db;
    public ProfileController(AppDbContext db) { _db = db; }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProfile(int id) {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        return Ok(new { user.Id, user.Name, user.Email, user.Role, user.BatchId });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProfile(int id, UpdateProfileDto dto) {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return NotFound();
        user.Name = dto.Name;
        user.Email = dto.Email;
        await _db.SaveChangesAsync();
        return Ok(new { user.Id, user.Name, user.Email });
    }
}