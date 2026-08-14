// backend/Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using InternAI.Api.Data;
using InternAI.Api.Models;
[ApiController][Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly AppDbContext _db; private readonly IConfiguration _config;
    public AuthController(AppDbContext db, IConfiguration config) { _db = db; _config = config; }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto) {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = JwtHelper.GenerateToken(user, _config);
        return Ok(new { token, role = user.Role, name = user.Name });
    }
}