namespace InternAI.Api.Models;

public class TaskItem {
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Type { get; set; } = "Coding";
    public string Status { get; set; } = "ToDo";
    public DateTime Deadline { get; set; }
    public int AssignedToUserId { get; set; }
}