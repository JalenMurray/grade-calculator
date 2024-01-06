import sqlite3

conn = sqlite3.connect('gradecalc.db')

cursor = conn.cursor()

# cursor.execute('CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50) NOT NULL, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL)')

# data = ('olivia', 'Olivia', 'Murray')
# cursor.execute('INSERT INTO users (username, firstname, lastname) VALUES (?, ?, ?)', data)

# conn.commit()

# cursor.execute('SELECT * FROM users')
# rows = cursor.fetchall()
# for row in rows:
#   print(row)

# conn.commit()
conn.close()