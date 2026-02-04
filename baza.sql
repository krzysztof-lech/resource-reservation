CREATE TABLE [dbo].[Rezerwacja] (
    [id]            INT IDENTITY (1, 1) NOT NULL,
    [uzytkownik_id] INT NOT NULL,
    [zasob_id]      INT NOT NULL,
    [rok]           INT NOT NULL,
    [mies]          INT NOT NULL,
    [dz]            INT NOT NULL,
    [godz]          INT NULL,
    [min]           INT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

CREATE TABLE [dbo].[Uzytkownik] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [Imie]     VARCHAR (50) NOT NULL,
    [Nazwisko] VARCHAR (50) NOT NULL,
    [Login]    VARCHAR (50) NOT NULL,
    [Haslo]    VARCHAR (50) NOT NULL,
    [Admin]    INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[Zasob] (
    [Id]       INT          IDENTITY (1, 1) NOT NULL,
    [Nazwa]    VARCHAR (50) NOT NULL,
    [Interwal] INT          NULL,
    [Godz_Od]  INT          NULL,
    [Min_Od]   INT          NULL,
    [Godz_Do]  INT          NULL,
    [Min_Do]   INT          NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);