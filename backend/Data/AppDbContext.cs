using Microsoft.EntityFrameworkCore;
using InternAI.Api.Models;

namespace InternAI.Api.Data;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Batch> Batches => Set<Batch>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();
    public DbSet<Submission> Submissions => Set<Submission>();
    public DbSet<SubmissionMessage> Messages => Set<SubmissionMessage>();
    public DbSet<Evaluation> Evaluations => Set<Evaluation>();
}