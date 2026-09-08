using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InternAI.Api.Data;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace InternAI.Api.Controller;

[Authorize(Roles = "Manager")]
[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase {
    private readonly AppDbContext _db;
    public ReportsController(AppDbContext db) { _db = db; }

    [HttpGet("performance/pdf")]
    public async Task<IActionResult> PerformanceReportPdf() {
        var interns = await _db.Users.Where(u => u.Role == "Intern").ToListAsync();
        var rows = new List<(string Name, int TaskCount, double AvgScore)>();

        foreach (var intern in interns) {
            var taskIds = await _db.Tasks.Where(t => t.AssignedToUserId == intern.Id).Select(t => t.Id).ToListAsync();
            var subIds = await _db.Submissions.Where(s => taskIds.Contains(s.TaskItemId)).Select(s => s.Id).ToListAsync();
            var avg = await _db.Evaluations.Where(e => subIds.Contains(e.SubmissionId)).AverageAsync(e => (double?)e.TotalScore) ?? 0;
            rows.Add((intern.Name, taskIds.Count, Math.Round(avg, 1)));
        }

        var document = Document.Create(container => {
            container.Page(page => {
                page.Margin(30);
                page.Header().Text("InternAI \u2014 Performance Report").FontSize(18).Bold();
                page.Content().Table(table => {
                    table.ColumnsDefinition(cols => {
                        cols.RelativeColumn(3);
                        cols.RelativeColumn(2);
                        cols.RelativeColumn(2);
                    });
                    table.Header(header => {
                        header.Cell().Text("Name").Bold();
                        header.Cell().Text("Tasks Assigned").Bold();
                        header.Cell().Text("Avg Score").Bold();
                    });
                    foreach (var r in rows) {
                        table.Cell().Text(r.Name);
                        table.Cell().Text(r.TaskCount.ToString());
                        table.Cell().Text($"{r.AvgScore}/100");
                    }
                });
                page.Footer().AlignCenter().Text(x => {
                    x.Span("Generated on ");
                    x.Span(DateTime.UtcNow.ToString("yyyy-MM-dd"));
                });
            });
        });

        var pdfBytes = document.GeneratePdf();
        return File(pdfBytes, "application/pdf", "InternAI_Performance_Report.pdf");
    }
}
