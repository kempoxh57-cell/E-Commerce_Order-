# ការតភ្ជាប់ Laravel ទៅកាន់ MySQL (XAMPP) សម្រាប់ Products និង Categories

ឯកសារនេះបង្ហាញពីជំហានលម្អិតពីដំបូងដល់ចប់ ក្នុងការបង្កើត Database, Config `.env`, Migration, Model, Seeder, និង API Routes ក្នុង Laravel ជាមួយ MySQL របស់ XAMPP។

---

## ជំហានទី ១៖ បើក MySQL ក្នុង XAMPP និងបង្កើត Database

1. បើកកម្មវិធី **XAMPP Control Panel**
2. ចុចប៊ូតុង **Start** នៅត្រង់ **Apache** និង **MySQL** (ឱ្យចេញពណ៌បៃតង)
3. បើក Browser ចូលទៅកាន់: `http://localhost/phpmyadmin`
4. ចុចលើពាក្យ **New** (នៅខាងឆ្វេង) ដើម្បីបង្កើត Database ថ្មី៖
   - **Database name:** `ecommerce_db`
   - **Collation:** `utf8mb4_unicode_ci`
   - ចុចប៊ូតុង **Create**

---

## ជំហានទី ២៖ កំណត់ Config ក្នុងឯកសារ `.env` របស់ Laravel

បើកឯកសារ `.env` នៅក្នុងគម្រោង Laravel របស់អ្នក រួចកែប្រែត្រង់ផ្នែក Database ដូចខាងក្រោម៖

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_db
DB_USERNAME=root
DB_PASSWORD=
```

> [!NOTE]
> នៅក្នុង XAMPP ជាទូទៅ User `root` គឺ **គ្មាន Password ទេ** ដូច្នេះសូមទុក `DB_PASSWORD=` ទំនេរ។

---

## ជំហានទី ៣៖ បង្កើត Migrations សម្រាប់ Categories និង Products

ដំណើរការ Command ខាងក្រោមក្នុង Terminal របស់ Laravel៖

```bash
php artisan make:migration create_categories_table
php artisan make:migration create_products_table
```

### 1. កែប្រែឯកសារ `database/migrations/xxxx_xx_xx_create_categories_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_name', 100);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

### 2. កែប្រែឯកសារ `database/migrations/xxxx_xx_xx_create_products_table.php`:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // Foreign Key ភ្ជាប់ទៅ Categories
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('product_name', 150);
            $table->decimal('price', 10, 2);
            $table->integer('stock_quantity')->default(0);
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

### 3. រត់ Migration ដើម្បីបង្កើត Tables ក្នុង MySQL:

```bash
php artisan migrate
```

---

## ជំហានទី ៤៖ បង្កើត Eloquent Models និង Relationships (1 : N)

ដំណើរការ Command បង្កើត Model:

```bash
php artisan make:model Category
php artisan make:model Product
```

### 1. ឯកសារ `app/Models/Category.php`:
ប្រភេទមួយមានផលិតផលជាច្រើន (`hasMany`):

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
        'description',
    ];

    // Relationship: 1 Category has many Products
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
```

### 2. ឯកសារ `app/Models/Product.php`:
ផលិតផលនីមួយៗស្ថិតនៅក្រោមប្រភេទមួយ (`belongsTo`):

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'product_name',
        'price',
        'stock_quantity',
        'image_url',
        'description',
    ];

    // Relationship: 1 Product belongs to 1 Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
```

---

## ជំហានទី ៥៖ បញ្ចូលទិន្នន័យគំរូ (Seeder) សម្រាប់ផលិតផលទាំង ៤

បង្កើត Seeder ដោយប្រើ Command:

```bash
php artisan make:seeder DatabaseSeeder
```

កែប្រែឯកសារ `database/seeders/DatabaseSeeder.php`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. បង្កើត Categories
        $computers = Category::create([
            'category_name' => 'Computers',
            'description'   => 'Laptops, Workstations, and PCs'
        ]);

        $accessories = Category::create([
            'category_name' => 'Accessories',
            'description'   => 'Mice, Keyboards, and Peripherals'
        ]);

        $displays = Category::create([
            'category_name' => 'Displays',
            'description'   => 'Monitors and Ultra HD Screens'
        ]);

        // 2. បញ្ចូលផលិតផលទាំង ៤ តាមលំហាត់
        Product::create([
            'category_id'    => $computers->id,
            'product_name'   => 'Laptop',
            'price'          => 650.00,
            'stock_quantity' => 12,
            'image_url'      => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
            'description'    => 'High performance laptop with 16GB RAM, 512GB SSD.'
        ]);

        Product::create([
            'category_id'    => $accessories->id,
            'product_name'   => 'Mouse',
            'price'          => 15.00,
            'stock_quantity' => 45,
            'image_url'      => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
            'description'    => 'Ergonomic wireless mouse with silent clicks.'
        ]);

        Product::create([
            'category_id'    => $accessories->id,
            'product_name'   => 'Keyboard',
            'price'          => 25.00,
            'stock_quantity' => 30,
            'image_url'      => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
            'description'    => 'RGB backlit mechanical keyboard.'
        ]);

        Product::create([
            'category_id'    => $displays->id,
            'product_name'   => 'Monitor',
            'price'          => 120.00,
            'stock_quantity' => 18,
            'image_url'      => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
            'description'    => '24-inch Full HD IPS monitor with 75Hz refresh rate.'
        ]);
    }
}
```

ដំណើរការ Seeder ចូលទៅកាន់ MySQL:

```bash
php artisan db:seed
```

---

## ជំហានទី ៦៖ បង្កើត Controller និង API Routes សម្រាប់ React

បង្កើត Controller:

```bash
php artisan make:controller Api/ProductController
php artisan make:controller Api/CategoryController
```

### 1. ឯកសារ `app/Http/Controllers/Api/ProductController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // ទាញយកផលិតផលទាំងអស់ រួមទាំងព័ត៌មាន Category
    public function index()
    {
        $products = Product::with('category')->get();
        return response()->json([
            'status' => 'success',
            'data'   => $products
        ], 200);
    }

    // ទាញយកផលិតផលតែមួយតាម ID
    public function show($id)
    {
        $product = Product::with('category')->find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data'   => $product
        ], 200);
    }
}
```

### 2. ឯកសារ `app/Http/Controllers/Api/CategoryController.php`:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    // ទាញយក Categories ទាំងអស់ រួមទាំងផលិតផលក្នុង Category នីមួយៗ
    public function index()
    {
        $categories = Category::with('products')->get();
        return response()->json([
            'status' => 'success',
            'data'   => $categories
        ], 200);
    }
}
```

### 3. បន្ថែម API Routes ក្នុង `routes/api.php` (ឬ `routes/web.php`):

```php
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
```

---

## ជំហានទី ៧៖ បើកដំណើរការ Laravel Server និងតេស្ត

ដំណើរការ Server:

```bash
php artisan serve
```

Server នឹងដំណើរការលើ `http://127.0.0.1:8000`

អ្នកអាចបើក Browser តេស្ត URL ទាំងនេះ៖
- 🛍️ **`http://127.0.0.1:8000/api/products`** (បញ្ជីផលិតផលទាំង ៤ ជាមួយ Category)
- 📂 **`http://127.0.0.1:8000/api/categories`** (បញ្ជី Categories)

---

## ជំហានទី ៨៖ ភ្ជាប់ពី React មកកាន់ Laravel API

នៅក្នុង React Component របស់អ្នក គ្រាន់តែប្រើ `fetch` ឬ `axios` ដើម្បីទាញទិន្នន័យពី Laravel MySQL មកបង្ហាញ៖

```jsx
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then((res) => res.json())
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div>កំពុងទាញទិន្នន័យពី Laravel MySQL...</div>;

  return (
    <div className="products-grid">
      {products.map((item) => (
        <div key={item.id} className="product-card">
          <img src={item.image_url} alt={item.product_name} />
          <h3>{item.product_name}</h3>
          <p>Category: {item.category?.category_name}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
    </div>
  );
}
```
