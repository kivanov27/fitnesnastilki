-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "link" VARCHAR(255) NOT NULL,
    "image1" VARCHAR(255),
    "image2" VARCHAR(255),
    "image3" VARCHAR(255),
    "image4" VARCHAR(255),
    "category" VARCHAR(20)[],
    "popular" BOOLEAN DEFAULT false,
    "description" TEXT,
    "manufacturer" VARCHAR(25),
    "manufacturer_description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "name" VARCHAR(50),
    "image" VARCHAR(255),
    "link" VARCHAR(50),
    "popular" BOOLEAN DEFAULT false,
    "id" SERIAL NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slider" (
    "text" VARCHAR(255),
    "image" VARCHAR(255),
    "id" SERIAL NOT NULL,

    CONSTRAINT "slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" VARCHAR(36) NOT NULL,
    "customer_name" VARCHAR(25) NOT NULL,
    "customer_surname" VARCHAR(25) NOT NULL,
    "customer_email" VARCHAR(255) NOT NULL,
    "customer_phone" VARCHAR(20) NOT NULL,
    "customer_address" VARCHAR(255) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(20) DEFAULT 'Pending',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "customer_city" VARCHAR(255) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" VARCHAR(36) NOT NULL,
    "order_id" VARCHAR(36) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(25),
    "lastName" VARCHAR(25),
    "city" VARCHAR(20) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logo" (
    "image" VARCHAR(255) NOT NULL,
    "link" VARCHAR(50) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "logo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_link_key" ON "product"("link");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

