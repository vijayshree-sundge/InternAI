namespace InternAI.Api.Models;

public class SubmissionMessage {
    public int Id { get; set; }
    public int TaskItemId { get; set; }
    public int SenderUserId { get; set; }
    public string Content { get; set; } = "";
    public string Type { get; set; } = "text";
    public DateTime SentAt { get; set; }
}