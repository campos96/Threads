using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Threads.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemovePictureFromProfileModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Profiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Profiles",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
