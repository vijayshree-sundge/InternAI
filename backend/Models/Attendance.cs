namespace InternAI.Api.Models;

public class Attendance {
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateOnly Date { get; set; }
    public string Status { get; set; } = "Present"; // Present | Absent | Leave
    public string? Note { get; set; }
}
