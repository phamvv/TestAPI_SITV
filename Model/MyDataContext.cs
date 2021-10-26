
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Configuration;

namespace TestAPI_SITV.Model
{
    public class MyDataContext : DbContext
    {

        public MyDataContext(DbContextOptions<MyDataContext> options)
            : base(options)
        { 
        
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {          
            optionsBuilder.UseLoggerFactory(GetLoggerFactory());        // bật logger
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Thiết lập khóa chính primary key(Nhân Viên) nếu Thuộc tính khóa không được xác định từ model
            modelBuilder.Entity<NhanVien>().HasKey(s => s.ID);

        }


        private ILoggerFactory GetLoggerFactory()
        {
            IServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.AddLogging(builder =>
                    builder.AddConsole()
                           .AddFilter(DbLoggerCategory.Database.Command.Name,
                                    LogLevel.Information));
            return serviceCollection.BuildServiceProvider()
                    .GetService<ILoggerFactory>();
        }

        public DbSet<NhanVien> nhanViens { set; get; }        // khai báo bảng Nhân Viên từ Model

    }

}
