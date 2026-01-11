// components/TestForm.tsx

'use client';

import { useState } from 'react';
import { addTestLead } from '@/actions/sheet'; // Импортируем наш Server Action
import { useFormStatus } from 'react-dom'; // Хук для статуса формы (Next.js)

// Вспомогательный компонент для кнопки (чтобы использовать useFormStatus)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
    >
      {pending ? 'Отправка...' : 'Отправить Лид'}
    </button>
  );
}

export default function TestForm() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Обработчик формы, который вызывает Server Action
  const formAction = async (formData: FormData) => {
    setMessage('');
    
    // Преобразование FormData в нужный нам объект
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };
    
    // Простая клиентская валидация
    if (!data.name || !data.email) {
        setMessage('Пожалуйста, заполните все поля.');
        setIsSuccess(false);
        return;
    }

    const result = await addTestLead(data);
    
    setMessage(result.message);
    setIsSuccess(result.success);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Тестовая форма для Google Sheets</h2>
      
      {/* Используем встроенный пропс 'action' для вызова Server Action */}
      <form action={formAction} className="space-y-4">
        
        <input 
          type="text" 
          name="name" 
          placeholder="Имя" 
          required 
          className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Телефон (опционально)" 
          className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        
        <SubmitButton />

        {message && (
          <p className={`mt-3 font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}