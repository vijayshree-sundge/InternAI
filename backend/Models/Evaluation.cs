namespace InternAI.Api.Models;

public class Evaluation {
    public int Id { get; set; }
    public int SubmissionId { get; set; }
    public int LogicScore { get; set; }
    public int StyleScore { get; set; }
    public int PracticesScore { get; set; }
    public int TotalScore { get; set; }
    public string Feedback { get; set; } = "";
}