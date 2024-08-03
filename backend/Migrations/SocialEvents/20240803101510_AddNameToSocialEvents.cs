using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.SocialEvents
{
    /// <inheritdoc />
    public partial class AddNameToSocialEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SocialEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "SocialEvents");
        }
    }
}
