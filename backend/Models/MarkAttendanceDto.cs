namespace InternAI.Api.Models;

public class MarkAttendanceDto {
    public int UserId { get; set; }
    public DateOnly Date { get; set; }
    public string Status { get; set; } = "Present";
    public string? Note { get; set; }
}
