using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;
using InternAI.Api.Models;

namespace InternAI.Api.Controller;

[Authorize(Roles = "Manager")]
[ApiController]
[Route("api/[controller]")]
public class BatchesController : ControllerBase {
    private readonly AppDbContext _db;
    public BatchesController(AppDbContext db) { _db = db; }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _db.Batches.ToListAsync());

    [HttpPost]
    public async Task<IActionResult> Create(Batch batch) {
        _db.Batches.Add(batch);
        await _db.SaveChangesAsync();
        return Ok(batch);
    }
}