-- ambil semua data dan semua kolom
SELECT * FROM table_name;

-- ambil semua data tetapi sebagian kolom
SELECT column_name, column_name FROM table_name;

-- ambil satu data aja
-- jika hanya ingin ambil satu data saja, 
-- usahakan pakai column yang punya nilai unique misalnya: ID
SELECT * FROM table_name
WHERE column_name = value;

-- ambil data berdasarkan kolom yang mengandung value tertentu
SELECT * FROM table_name
WHERE column_name LIKE value;