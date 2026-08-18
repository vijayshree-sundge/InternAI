using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InternAI.Api.Data;
using InternAI.Api.Models;

namespace InternAI.Api.Controller;

[Authorize(Roles = "Manager")]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase {
    private readonly AppDbContext _db;
    public UsersController(AppDbContext db) { _db = db; }

    [HttpPost("intern")]
    public async Task<IActionResult> CreateIntern(CreateInternDto dto) {
        var intern = new User {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Intern",
            BatchId = dto.BatchId
        };
        _db.Users.Add(intern);
        await _db.SaveChangesAsync();
        return Ok(new { intern.Id, intern.Name, intern.Email });
    }
}
