namespace InternAI.Api.Models;

public class TaskCreateDto {
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Type { get; set; } = "Coding";
    public DateTime Deadline { get; set; }
    public int? AssignedToUserId { get; set; } // used for individual assignment
}
