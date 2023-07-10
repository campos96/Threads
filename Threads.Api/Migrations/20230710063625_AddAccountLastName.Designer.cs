﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Threads.Api.Data;

#nullable disable

namespace Threads.Api.Migrations
{
    [DbContext(typeof(ThreadsContext))]
    [Migration("20230710063625_AddAccountLastName")]
    partial class AddAccountLastName
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Threads.Core.Models.Account", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Threads.Core.Models.Follower", b =>
                {
                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("FollowerAccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("AccountId", "FollowerAccountId");

                    b.HasIndex("FollowerAccountId");

                    b.ToTable("Followers");
                });

            modelBuilder.Entity("Threads.Core.Models.Profile", b =>
                {
                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Biography")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("bit");

                    b.Property<string>("Link")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Picture")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("AccountId");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("Threads.Core.Models.Security", b =>
                {
                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("LastPasswordReset")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PasswordResetExpiration")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("PasswordResetToken")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("AccountId");

                    b.ToTable("Security");
                });

            modelBuilder.Entity("Threads.Core.Models.Thread", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("QuotedThreadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("RepliedThreadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Reply")
                        .HasColumnType("int");

                    b.Property<Guid?>("RepostedThreadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("QuotedThreadId");

                    b.HasIndex("RepliedThreadId");

                    b.HasIndex("RepostedThreadId");

                    b.ToTable("Threads");
                });

            modelBuilder.Entity("Threads.Core.Models.ThreadAttachment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("Data")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<Guid>("ThreadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ThreadId");

                    b.ToTable("ThreadAttachments");
                });

            modelBuilder.Entity("Threads.Core.Models.Follower", b =>
                {
                    b.HasOne("Threads.Core.Models.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Threads.Core.Models.Account", "FollowerAccount")
                        .WithMany()
                        .HasForeignKey("FollowerAccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("FollowerAccount");
                });

            modelBuilder.Entity("Threads.Core.Models.Profile", b =>
                {
                    b.HasOne("Threads.Core.Models.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Threads.Core.Models.Security", b =>
                {
                    b.HasOne("Threads.Core.Models.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Threads.Core.Models.Thread", b =>
                {
                    b.HasOne("Threads.Core.Models.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Threads.Core.Models.Thread", "QuotedThread")
                        .WithMany()
                        .HasForeignKey("QuotedThreadId");

                    b.HasOne("Threads.Core.Models.Thread", "RepliedThread")
                        .WithMany()
                        .HasForeignKey("RepliedThreadId");

                    b.HasOne("Threads.Core.Models.Thread", "RepostedThread")
                        .WithMany()
                        .HasForeignKey("RepostedThreadId");

                    b.Navigation("Account");

                    b.Navigation("QuotedThread");

                    b.Navigation("RepliedThread");

                    b.Navigation("RepostedThread");
                });

            modelBuilder.Entity("Threads.Core.Models.ThreadAttachment", b =>
                {
                    b.HasOne("Threads.Core.Models.Thread", "Thread")
                        .WithMany("Attachments")
                        .HasForeignKey("ThreadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Thread");
                });

            modelBuilder.Entity("Threads.Core.Models.Thread", b =>
                {
                    b.Navigation("Attachments");
                });
#pragma warning restore 612, 618
        }
    }
}
