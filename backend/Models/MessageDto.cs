namespace InternAI.Api.Models;

public class MessageDto {
    public string Content { get; set; } = "";
    public string Type { get; set; } = "text"; // text | code | ai_feedback
}