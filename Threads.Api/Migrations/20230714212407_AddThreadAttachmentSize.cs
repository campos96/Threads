using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Threads.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddThreadAttachmentSize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "ThreadAttachments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "ThreadAttachments",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "ThreadAttachments");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "ThreadAttachments");
        }
    }
}
