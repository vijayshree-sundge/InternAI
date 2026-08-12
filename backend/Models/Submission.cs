namespace InternAI.Api.Models;

public class Submission {
    public int Id { get; set; }
    public int TaskItemId { get; set; }
    public string Code { get; set; } = "";
    public string? FileUrl { get; set; }
    public string? GithubLink { get; set; }
    public DateTime SubmittedAt { get; set; }
}