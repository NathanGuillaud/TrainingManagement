CREATE TABLE IF NOT EXISTS "role" (
    "id"   SERIAL ,
    "name" VARCHAR(255) UNIQUE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "member" (
    "id"   SERIAL ,
    "username" VARCHAR(255) UNIQUE,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255), "password" VARCHAR(255),
    "email" VARCHAR(255),
    "enabled" BOOLEAN,
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "postalCode" INTEGER,
    "birthDate" TIMESTAMP WITH TIME ZONE,
    "gender" VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "member_role" (
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "MemberId" INTEGER  REFERENCES "member" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "RoleId" INTEGER  REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("MemberId","RoleId")
);

CREATE TABLE IF NOT EXISTS "training" (
    "id"   SERIAL ,
    "name" VARCHAR(255),
    "description" TEXT,
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "postalCode" INTEGER,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "course" (
    "id"   SERIAL ,
    "day" DATE,
    "begin" TIME,
    "end" TIME,
    "price" FLOAT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "TrainingId" INTEGER NOT NULL REFERENCES "training" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "enrollment" (
    "id"   SERIAL ,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "CourseId" INTEGER NOT NULL REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "MemberId" INTEGER REFERENCES "member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "invoice" (
    "id"   SERIAL ,
    "price" FLOAT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "TrainingId" INTEGER NOT NULL REFERENCES "training" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "MemberId" INTEGER REFERENCES "member" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
