using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestAPI_SITV.Model
{
    [Table("NhanVien")]
    public class NhanVien
    {
        [Key]   
        public int ID { get; set; }

        [StringLength(50)]
        public string MaNhanVien { get; set; }

        [StringLength(100)]
        public string HoTenNhanVien { get; set; }

        [StringLength(500)]
        public string DiaChi { get; set; }


        [StringLength(50)]
        public string PhongBan { get; set; }

    }
}
