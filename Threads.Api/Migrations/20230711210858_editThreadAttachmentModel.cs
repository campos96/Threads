using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Threads.Api.Migrations
{
    /// <inheritdoc />
    public partial class editThreadAttachmentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "ThreadAttachments");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "ThreadAttachments",
                newName: "Bytes");

            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "ThreadAttachments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "ThreadAttachments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "ThreadAttachments");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "ThreadAttachments");

            migrationBuilder.RenameColumn(
                name: "Bytes",
                table: "ThreadAttachments",
                newName: "Data");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "ThreadAttachments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
