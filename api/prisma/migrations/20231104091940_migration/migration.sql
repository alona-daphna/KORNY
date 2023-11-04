-- CreateTable
CREATE TABLE "cards" (
    "card_id" SERIAL NOT NULL,
    "set_id" INTEGER NOT NULL,
    "term" VARCHAR(100) NOT NULL,
    "definition" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "study_sets" (
    "set_id" SERIAL NOT NULL,
    "set_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "study_sets_pkey" PRIMARY KEY ("set_id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "study_sets"("set_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
