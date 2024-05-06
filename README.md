# web-dz-true

lab 4 node js
# -----------------
const fs = require('fs');

const filePath = 'example.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Не удалось прочитать:', err);
    return;
  }

  const reversedText = data.split('').reverse().join('');

  fs.writeFile(filePath, reversedText, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Ревёрс произошёл.');
  });
});

# ------------------------------------

Код который делает ревёрсит надпись в текстовом файле

# -----------------------------------------
const http = require('http');
const fs = require('fs');

const port = 3000;
const filePath = 'example.txt';


const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('чё то упало');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }

  else if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      fs.appendFile(filePath, body, 'utf8', (err) => {
        if (err) {
          console.error('не получилось:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('чё то упало');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Доступ к файлу получен.');
      });
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Не найдено');
  }
});


server.listen(port, () => {
  console.log(`Сервер готов http://localhost:${port}`);
});
# ------------------------------------------
Вывод текстового файла в боди сервера

# ------------------------------------------------
LAB 6
upr 1
# ----------------------------------------------

export interface User {
    name: string;
    age: number;
    occupation: string;
}

export const users: User[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];

export function logPerson(user: User) {
    console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);

# -------------------------------------------------
upr 2
# --------------------------------------------------
type User = {
    id: string;
    name: string;
}

type Course = {
    id: number;
    title: string;
}

type WithRate = {
    rate: 1 | 2 | 3 | 4 | 5;
}

type WithStudentRole = {
    role: "student"
}

type WithTeacherRole = {
    role: "teacher"
}

type WithLevel = {
    level: "junior" | "middle" | "senior"
}



type StudentCourse = Course & WithStudentRole & WithRate & WithLevel
type Student = User & { courses: { [id: number]: StudentCourse } }

type TeacherCourse = Course & WithTeacherRole
type Teacher = User & WithLevel & { courses: { [id: number]: TeacherCourse } }

type Director = User & {
    students: { [id: string]: User },
    teachers: { [id: string]: User & WithLevel & WithRate }
}


const s1: Student = {
    id: "s1",
    name: "s1",
    courses: {
        [1]: {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        }
    },
}

const t1: Teacher = {
    id: "t1",
    name: "t1",
    level: "junior",
    courses: {
        [5]: {
            id: 5,
            title: "Fifth",
            role: "teacher"
        },
        [1]: {
            ...s1.courses[1],
            role: "teacher"
        }
    }
}

const d1: Director = {
    id: "d1",
    name: "d1",
    students: {
        ["s1"]: s1,
        ["s2"]: {
            id: "s2",
            name: "s2"
        }
    },
    teachers: {
        ["t1"]: {
            ...t1,
            rate: 3,
        },
        ["t2"]: {
            id: "t2",
            name: "t2",
            level: "senior",
            rate: 5
        }
    }
}

# -----------------------------------
upr 3
# -----------------------------------

function zip<T, U>(first: T[], second: U[]): Array<[T, U]> {
  const minLength = Math.min(first.length, second.length);
  const result: Array<[T, U]> = [];
  for (let i = 0; i < minLength; i++) {
    result.push([first[i], second[i]])
  }
  return result
}

const q1: Array<[number, string]> = zip([1, 2, 3, 4, 5, 6], ["1", "2", "3"]);
const q2: Array<[boolean, boolean]> = zip([true], [false, false]);
console.log(q1, q2);

function groupBy<T, K, V>(source: T[], keySelector: (item: T, index: number) => K, valueSelector: (item: T, index: number) => V): Map<K, V[]> {
  const result = new Map<K, V[]>();
  for (let i = 0; i < source.length; i++) {
    const item = source[i];
    const key = keySelector(item, i);
    const value = valueSelector(item, i);
    if (!result.has(key)) {
      result.set(key, []);
    }
    result.get(key)?.push(value);
  }

  return result;
}

const q3: Map<number, number[]> = groupBy([1, 2, 3, 4], x => x % 2, x => x + 1);
const q4: Map<boolean, {x: string, i: number}[]>  = groupBy(["aaa", "bbb", "cc", "q", "lalaka"], (_, i) => i%2 === 0, (x, i) => ({i, x}))
console.log(q3, q4);

# --------------------------------------------------------------
upr 4
# --------------------------------------------------------------

type User = {
    id: string;
    name: string;
}

type Role = "student" | "teacher"

type Rate =  1 | 2 | 3 | 4 | 5

type Level =  "junior" | "middle" | "senior"

type Course = {
    id: number;
    title: string;
    role: Role;
    rate: Rate;
    level: Level;
}

type Student = User & { 
    courses: { [id: number]: Omit<Course, "role"> & { role: Exclude<Role, "teacher">} } 
}

type Teacher = User & {
    courses: { [id: number]: Omit<Course, "role"> & { role: Exclude<Role, "student">} }
}

type Director = User & {
    students: { [id: string]: Student };
    teachers: { [id: string]: Teacher };
}

/*--  Проверка  --*/
const s1: Student = {
    id: "s1",
    name: "s1",
    courses: {
        [1]: {
            id: 1,
            title: "First",
            rate: 5,
            role: "student",
            level: "middle"
        }
    },
}

const t1: Teacher = {
    id: "t1",
    name: "t1",
    courses: {
        [5]: {
            id: 5,
            title: "Fifth",
            role: "teacher",
            rate: 3,
            level: "junior"
        },
        [1]: {
            ...s1.courses[1],
            role: "teacher"
        }
    }
}

const d1: Director = {
    id: "d1",
    name: "d1",
    students: {
        ["s1"]: s1,
        ["s2"]: {
            id: "s2",
            name: "s2",
            courses: {
                [2]: {
                    id: 2,
                    title: "Second",
                    rate: 4,
                    role: "student",
                    level: "senior"
                }
            }
        }
    },
    teachers: {
        ["t1"]: t1,
        ["t2"]: {
            id: "t2",
            name: "t2",
            courses: {
                [3]: {
                    id: 3,
                    title: "Third",
                    rate: 2,
                    role: "teacher",
                    level: "middle"
                }
            }
        }
    }
}

#------------------------------------------------
lab 7
#------------------------------------------------
# 1
import React from 'react';

function Square({ n }) {
  return <div>{n * n}</div>;
}

export default Square;
#---------------------------------------------
# 2
function OnlyEven({ arr }) {
    const evenNumbers = arr.filter(item => item % 2 === 0);
    return <div>{evenNumbers.join(', ')}</div>;
  }
  
  export default OnlyEven;
# ---------------------------------------------
# 3
function Temperature({ t }) {
    const textColor = t < 0 ? 'red' : 'blue';
    
    const style = {
      color: textColor
    };
  
    return <div style={style}>{t}</div>;
  }
  
  export default Temperature;
# ------------------------------------------------
# 4
import React, { useState } from 'react';

function ToggleButton() {
    const [isRed, setIsRed] = useState(true);
  
    const handleClick = () => {
      setIsRed(!isRed);
    };
  
    const buttonStyle = {
      backgroundColor: isRed ? 'red' : 'green',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    };
  
    return (
      <button style={buttonStyle} onClick={handleClick}>
        {isRed ? 'Make Green' : 'Make Red'}
      </button>

      # ------------------------------------------------------------------
     



       
      # --------------------------LAB 8-----------------------------------
      #1

      import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  return <div>{count}</div>;
}

function App() {
  return (
    <div className="App">
      <h1>Обратный таймер</h1>
      <Timer />
    </div>
  );
}

export default App;
    );
  }
  
  export default ToggleButton;

# -----------------------------------------------------------------------------
# 2

import React, { useState, useEffect } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setCount(count + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [count, isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleStartStop}>{isRunning ? '⏸️' : '▶️'}</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Таймер</h1>
      <Timer />
    </div>
  );
}

export default App;

# ------------------------------------------------------------------------------------------------
# 3
import React, { useState, useEffect } from 'react';

function PrimeNumbers() {
  const [primes, setPrimes] = useState([2]);

  useEffect(() => {
    const isPrime = num => {
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    };

    const timer = setInterval(() => {
      let nextPrime = primes[primes.length - 1] + 1;
      while (!isPrime(nextPrime)) {
        nextPrime++;
      }
      setPrimes(prevPrimes => [...prevPrimes, nextPrime]);
    }, 1000);

    return () => clearInterval(timer);
  }, [primes]);

  return (
    <div>
      {primes.map((prime, index) => (
        <span key={index}>{prime}, </span>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Простые числа</h1>
      <PrimeNumbers />
    </div>
  );
}

export default App;

# ----------------------------------------------------------------
# 5

import React, { useState, useEffect } from 'react';

function Revert({ s }) {
  const [revertedString, setRevertedString] = useState(s);

  useEffect(() => {
    const timer = setInterval(() => {
      setRevertedString(prevString => {
        const lastChar = prevString.charAt(prevString.length - 1);
        const restOfString = prevString.slice(0, -1);
        return lastChar + restOfString;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [s]);

  return <div>{revertedString}</div>;
}

function App() {
  return (
    <div className="App">
      <h1>Перевернутая строка</h1>
      <Revert s="привет!" />
    </div>


  );
}

export default App;

# ----------------форма и валидации лаба------------------------------------------------
# 1
const CitySelect = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <label htmlFor="citySelect">Выберите город:</label>
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
        <option value="">Выберите город</option>
        <option value="rio">Рио-де-Жанейро</option>
        <option value="other">Другой город</option>
      </select>
      {selectedCity !== 'rio' && <p>Нет, это не Рио-де-Жанейро!</p>}
    </div>
  );
};

export default CitySelect;


# 2
const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');

  const handleNum1Change = (e) => {
    setNum1(e.target.value);
  };

  const handleNum2Change = (e) => {
    setNum2(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const calculateResult = () => {
    let res;
    switch (operation) {
      case '+':
        res = parseFloat(num1) + parseFloat(num2);
        break;
      case '-':
        res = parseFloat(num1) - parseFloat(num2);
        break;
      case '*':
        res = parseFloat(num1) * parseFloat(num2);
        break;
      case '/':
        res = parseFloat(num1) / parseFloat(num2);
        break;
      default:
        res = '';
    }
    setResult(res);
  };

  return (
    <div>
      <input type="number" value={num1} onChange={handleNum1Change} />
      <select value={operation} onChange={handleOperationChange}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" value={num2} onChange={handleNum2Change} />
      <button onClick={calculateResult}>=</button>
      <p>{result !== '' ? `${num1} ${operation} ${num2} = ${result}` : ''}</p>
    </div>
  );
};

export default Calculator;

# 3

import React, { useState } from 'react';



const DecimalToBinaryConverter = (decimal) => {
  return (decimal >>> 0).toString(2);
};

const BinaryToDecimalConverter = (binary) => {
  return parseInt(binary, 2);
};

const NumberSystemConverter = () => {
  const [number, setNumber] = useState('');
  const [system, setSystem] = useState('decimal');
  const [result, setResult] = useState('');

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSystemChange = (e) => {
    setSystem(e.target.value);
  };

  const handleConvert = () => {
    if (system === 'decimal') {
      setResult(BinaryToDecimalConverter(number));
    } else {
      setResult(DecimalToBinaryConverter(number));
    }
  };

  return (
    <div>
      <input type="text" value={number} onChange={handleNumberChange} />
      <select value={system} onChange={handleSystemChange}>
        <option value="decimal">Decimal</option>
        <option value="binary">Binary</option>
      </select>
      <button onClick={handleConvert}>Convert</button>
      <input type="text" value={result} readOnly />
    </div>
  );
};

export default NumberSystemConverter;

# 4

import React, { useState, useEffect } from 'react';

const AgeInSecondsCounter = ({ birthDate }) => {
  const [ageInSeconds, setAgeInSeconds] = useState(0);

  useEffect(() => {
    const calculateAgeInSeconds = () => {
      const birthDateObj = new Date(birthDate);
      const currentDateObj = new Date();
      const differenceInSeconds = (currentDateObj - birthDateObj) / 1000;
      setAgeInSeconds(Math.floor(differenceInSeconds));
    };

    const intervalId = setInterval(calculateAgeInSeconds, 1000);

    return () => clearInterval(intervalId);
  }, [birthDate]);

  return <p>Вы прожили: {ageInSeconds} секунд.</p>;
};

export default AgeInSecondsCounter;

# 5

import React, { useState } from 'react';

const NumberListFilter = () => {
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('all');
  const [numbers, setNumbers] = useState([1, 13, 6, 52, 4, 14]);

  const handleNumberChange = (e) => {
    setNumber(parseInt(e.target.value));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddNumber = () => {
    if (!isNaN(number)) {
      setNumbers([...numbers, number]);
      setNumber('');
    }
  };

  const filteredNumbers = numbers.filter((num) => {
    if (filter === 'even') {
      return num % 2 === 0;
    } else if (filter === 'odd') {
      return num % 2 !== 0;
    } else {
      return true;
    }
  });

  return (
    <div>
      <input type="number" value={number} onChange={handleNumberChange} />
      <button onClick={handleAddNumber}>+</button>
      <select value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="even">Even</option>
        <option value="odd">Odd</option>
      </select>
      <ul>
        {filteredNumbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberListFilter;

# Валидация 1

import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = 'Поле "Логин" обязательное';
    } else if (username.length < 6 || username.length > 20) {
      errors.username = 'Логин должен содержать от 6 до 20 символов';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.username = 'Логин может содержать только буквы латинского алфавита и цифры';
    }

    if (!password) {
      errors.password = 'Поле "Пароль" обязательное';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Поле "Повтор пароля" обязательное';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Пароли должны совпадать';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      console.log('Форма отправлена');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Логин:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Повтор пароля:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;

# 2

import React, { useState } from 'react';

const ProfileEditForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'Поле "Имя" обязательно';
    }

    if (!middleName.trim()) {
      errors.middleName = 'Поле "Отчество" обязательно';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Поле "Фамилия" обязательно';
    }

    // Проверка формата даты рождения
    if (birthdate.trim() && !/^\d{2}\.\d{2}\.\d{4}$/.test(birthdate)) {
      errors.birthdate = 'Неправильный формат даты рождения (ДД.ММ.ГГГГ)';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Отправка данных формы
      console.log('Форма отправлена');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <label htmlFor="middleName">Отчество:</label>
        <input
          type="text"
          id="middleName"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        {errors.middleName && <span>{errors.middleName}</span>}
      </div>
      <div>
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label htmlFor="birthdate">Дата рождения (ДД.ММ.ГГГГ):</label>
        <input
          type="text"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        {errors.birthdate && <span>{errors.birthdate}</span>}
      </div>
      <div>
        <label htmlFor="address">Адрес:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default ProfileEditForm;

# -----------------------------------lab 10--------------------------------
# 1

import React, { useState } from 'react';
import axios from 'axios';

const PostDetails = () => {
  const [id, setId] = useState('');
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const userData = await axios.get(`https://jsonplaceholder.typicode.com/users/${postResponse.data.userId}`);

      setPost(postResponse.data);
      setUser(userData.data);
      setError(null);
    } catch (error) {
      setPost(null);
      setUser(null);
      setError('Не удалось загрузить данные');
    }
  };

  return (
    <div>
      <label htmlFor="postId">ID:</label>
      <input type="text" id="postId" value={id} onChange={handleIdChange} />
      <button onClick={fetchData}>Получить данные</button>

      {error && <p>{error}</p>}

      {post && user && (
        <div>
          <h2>Пост</h2>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
          
          <h2>Пользователь</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetails;

# ---------------------------lab 5-----------------------------------------
# 1
function counter(n) {
    let currentCount = n;
    const intervalId = setInterval(() => {
      console.log(currentCount);
      if (currentCount === 0) {
        clearInterval(intervalId);
      } else {
        currentCount--;
      }
    }, 1000);
  }
  

  function createCounter(n) {
    let currentCount = n;
    let intervalId;
  
    return {
      start() {
        intervalId = setInterval(() => {
          console.log(currentCount);
          if (currentCount === 0) {
            clearInterval(intervalId);
          } else {
            currentCount--;
          }
        }, 1000);
      },
      pause() {
        clearInterval(intervalId);
      },
      stop() {
        clearInterval(intervalId);
        currentCount = n;
      }
    };
  }
  

  const myCounter = createCounter(5);
  myCounter.start();
 
   setTimeout(() => myCounter.pause(), 5000);

   # 2
   function delay(N) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, N * 1000);
    });
  }
  

  async function counter(N) {
    for (let i = N; i >= 0; i--) {
      console.log(i);
      await delay(1);
    }
  }
  

  counter(5); 
  

  async function getFirstRepo(username) {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      const reposResponse = await fetch(userData.repos_url);
      const reposData = await reposResponse.json();
      if (reposData.length > 0) {
        return reposData[0].name;
      } else {
        return 'Репозитории не найдены';
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return 'Ошибка при выполнении запроса';
    }
  }
  

   getFirstRepo('MelnikSR').then(repoName => console.log(repoName)); 
  

  async function displayResult() {
    try {
      const repoName = await getFirstRepo('MelnikSR'); 
      document.getElementById('result').innerText = repoName;
    } catch (error) {
      document.getElementById('result').innerText = 'Ошибка при выполнении запроса';
    }
  }
  
 
  displayResult();

  #

  
class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  async function loadJson(url) {
    const response = await fetch(url);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new HttpError(response);
    }
  }
  
  async function getGithubUser() {
    let user;
    while (!user) {
      let name = prompt("Введите логин?", "iliakan");
      try {
        user = await loadJson(`https://api.github.com/users/${name}`);
        alert(`Полное имя: ${user.name}.`);
      } catch (err) {
        if (err instanceof HttpError && err.response.status === 404) {
          alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        } else {
          throw err;
        }
      }
    }
    return user;
  }
  
  getGithubUser();
