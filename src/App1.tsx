import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInAnonymously, signInWithCustomToken,
} from 'firebase/auth';
import {
  getFirestore, collection, query, onSnapshot,
  addDoc, deleteDoc, doc, setLogLevel, setDoc // setDoc добавлен для обновления
} from 'firebase/firestore';
import "./index1.css";
// Установка уровня логирования для отладки Firebase
setLogLevel('debug');

// Получение глобальных переменных из среды выполнения
// Предполагается, что эти переменные доступны в вашей среде
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Иконки SVG (встроенные, чтобы избежать конфликта с библиотекой lucide.create)
const CheckIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);


const App1 = () => {
  // Состояния для хранения аутентификации, базы данных, задач
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // НОВЫЙ ФЛАГ для контроля запуска подписки
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Инициализация Firebase и Аутентификация
  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);

        // Сначала устанавливаем экземпляр базы данных
        setDb(dbInstance);

        // Вход: используем токен, если доступен, иначе анонимно
        const userCredential = initialAuthToken
          ? await signInWithCustomToken(authInstance, initialAuthToken)
          : await signInAnonymously(authInstance);

        // Установка userId и готовность аутентификации ТОЛЬКО после успешного входа
        setUserId(userCredential.user.uid);
        setIsAuthReady(true);

      } catch (e) {
        console.error("Ошибка инициализации или аутентификации Firebase:", e);
        setError("Не удалось подключиться к сервисам Firebase. Проверьте конфигурацию.");
        setIsAuthReady(true); // Устанавливаем в true, чтобы прослушиватель знал, что процесс завершен
        setIsLoading(false);
      }
    };

    initializeFirebase();
  }, []);

  // 2. Подписка на Firestore (запускается только после готовности аутентификации)
  useEffect(() => {
    // Важная проверка: запускаем подписку только после того, как db установлен И аутентификация готова И userId доступен
    if (!db || !isAuthReady || !userId) {
      if(isAuthReady && !userId) {
        // Если аутентификация готова, но userId нет (произошла ошибка), не запускаем прослушиватель
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);

    // Динамический путь к коллекции задач
    const userTasksPath = `/artifacts/${appId}/users/${userId}/tasks`;
    const tasksCollection = collection(db, userTasksPath);

    // Создание запроса
    const q = query(tasksCollection);

    // onSnapshot: слушатель в реальном времени, который обновляет состояние React
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Сортировка данных в памяти (избегаем ошибок индексации Firestore)
      fetchedTasks.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

      setTasks(fetchedTasks);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      // Обработка ошибки подписки (часто permission-denied)
      console.error("Ошибка при получении задач из Firestore:", err);
      // Отображение ошибки для пользователя
      setError(`Ошибка доступа к данным: ${err.code} - Проверьте правила безопасности Firestore.`);
      setIsLoading(false);
    });

    // Функция очистки для отписки при демонтаже или изменении зависимостей
    return () => unsubscribe();
  }, [db, isAuthReady, userId]); // Зависимость от isAuthReady и userId гарантирует ожидание аутентификации

  // Обработчик добавления новой задачи
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim() || !db || !userId) return;

    const userTasksPath = `/artifacts/${appId}/users/${userId}/tasks`;

    try {
      await addDoc(collection(db, userTasksPath), {
        text: newTaskText.trim(),
        completed: false,
        createdAt: Date.now(),
      });
      setNewTaskText('');
      setError(null);
    } catch (e) {
      console.error("Ошибка при добавлении документа: ", e);
      setError("Не удалось добавить задачу.");
    }
  };

  // Обработчик удаления задачи
  const handleDeleteTask = async (taskId) => {
    const userTaskDocPath = `/artifacts/${appId}/users/${userId}/tasks/${taskId}`;

    try {
      await deleteDoc(doc(db, userTaskDocPath));
      setError(null);
    } catch (e) {
      console.error("Ошибка при удалении документа: ", e);
      setError("Не удалось удалить задачу.");
    }
  };

  // Обработчик переключения состояния "выполнено"
  const handleToggleComplete = async (task) => {
    const userTaskDocPath = `/artifacts/${appId}/users/${userId}/tasks/${task.id}`;

    try {
      const taskDocRef = doc(db, userTaskDocPath);
      // setDoc с merge: true для обновления только поля 'completed'
      await setDoc(taskDocRef, { completed: !task.completed }, { merge: true });
      setError(null);
    } catch (e) {
      console.error("Ошибка при обновлении документа: ", e);
      setError("Не удалось обновить задачу.");
    }
  };

  // Компонент рендеринга
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex justify-center items-start pt-10 font-sans">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 space-y-6">

        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Менеджер Задач
        </h1>

        {/* Индикатор загрузки / Ошибка */}
        {isLoading && (!tasks.length || !isAuthReady) ? (
          <div className="text-center p-4 text-lg text-blue-500">
            <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Загрузка данных и аутентификация...
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center font-medium">
            Ошибка: {error}
          </div>
        ) : null}

        {/* Отображение ID Пользователя (полностью) */}
        <div className="text-xs text-gray-500 dark:text-gray-400 p-2 border-b border-gray-200 dark:border-gray-700 break-words">
          ID Пользователя: <span className="font-mono text-gray-700 dark:text-gray-300">{userId || 'Ожидание аутентификации...'}</span>
        </div>

        {/* Форма добавления задачи */}
        <form onSubmit={handleAddTask} className="flex space-x-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Новая задача..."
            className="flex-grow p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
            disabled={!userId || isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50"
            disabled={!userId || newTaskText.trim() === '' || isLoading}
          >
            Добавить
          </button>
        </form>

        {/* Список задач */}
        <div className="space-y-3">
          {tasks.length === 0 && !isLoading ? (
            <p className="text-center text-gray-500 dark:text-gray-400 p-4">
              Список задач пуст. Добавьте первую!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition duration-150 ease-in-out ${
                  task.completed
                    ? 'bg-green-100 dark:bg-green-900 border-l-4 border-green-500 opacity-70'
                    : 'bg-white dark:bg-gray-700 border-l-4 border-gray-300 dark:border-gray-600'
                }`}
              >
                <div
                  className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.text}
                </div>

                <div className="flex space-x-2 ml-4">
                  {/* Кнопка Завершить/Отменить */}
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`p-2 rounded-full transition duration-150 ease-in-out ${task.completed ? 'text-gray-600 hover:text-green-600' : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-800'}`}
                    aria-label={task.completed ? "Отменить выполнение" : "Отметить как выполненное"}
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>

                  {/* Кнопка Удалить */}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-800 rounded-full transition duration-150 ease-in-out"
                    aria-label="Удалить задачу"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default App1;
