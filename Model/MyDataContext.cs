
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace TestAPI_SITV.Model
{
    public class MyDataContext : DbContext
    {
        public DbSet<NhanVien> nhanViens { set; get; }        // khai báo bảng Nhân Viên từ Model


        // chuỗi kết nối đến database với tên MyDB sẽ làm việc
        public const string ConnectStrring = @"Data Source=localhost,1433;Initial Catalog=MyDB;User ID=SA;Password=Password123";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectStrring);                // thiết lập kết nối đến database
            optionsBuilder.UseLoggerFactory(GetLoggerFactory());        // bật logger
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

    }

}
