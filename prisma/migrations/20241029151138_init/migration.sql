-- CreateTable
CREATE TABLE "pacientes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "fecha_nacimiento" DATETIME NOT NULL,
    "direccion" TEXT,
    "alergia_medicamento" TEXT,
    "diagnostico" TEXT,
    "tratamiento" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cedula_key" ON "pacientes"("cedula");
