namespace InternAI.Api.Models;

public class User {
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Role { get; set; } = "Intern"; // "Manager" | "Intern"
    public int? BatchId { get; set; }
}