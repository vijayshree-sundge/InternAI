using System.Text;
using System.Text.Json;

namespace InternAI.Api.Services;

public class AiEvaluationResult {
    public int Logic { get; set; }
    public int Style { get; set; }
    public int Practices { get; set; }
    public int Total { get; set; }
    public List<string> Suggestions { get; set; } = new();
    public string ExecutionOutput { get; set; } = "";
}

public class AiServiceClient {
    private readonly HttpClient _http;
    public AiServiceClient(HttpClient http) { _http = http; }

    public async Task<AiEvaluationResult> EvaluateAsync(string code, string language) {
        var payload = JsonSerializer.Serialize(new { code, language });
        var content = new StringContent(payload, Encoding.UTF8, "application/json");
        var response = await _http.PostAsync("/evaluate", content);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var suggestions = new List<string>();
        if (root.TryGetProperty("suggestions", out var sugg))
            foreach (var s in sugg.EnumerateArray()) suggestions.Add(s.GetString() ?? "");

        return new AiEvaluationResult {
            Logic = root.GetProperty("logic").GetInt32(),
            Style = root.GetProperty("style").GetInt32(),
            Practices = root.GetProperty("practices").GetInt32(),
            Total = root.GetProperty("total").GetInt32(),
            Suggestions = suggestions,
            ExecutionOutput = root.TryGetProperty("execution_output", out var eo) ? eo.GetString() ?? "" : ""
        };
    }
}