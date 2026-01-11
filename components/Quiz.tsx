// components/Quiz.tsx (Обновленный, без next-intl)

"use client";

import { useState, useCallback, useMemo } from "react";
// import { useTranslations } from 'next-intl'; // УДАЛЕНО
import { submitQuizAction } from "@/actions/quiz";
import { QuizQuestion, QuizAnswers } from "@/types/quiz";
import { ChevronLeft, Send } from "lucide-react";

interface QuizProps {
  questions: QuizQuestion[];
}

// Статические тексты, которые не зависят от вопросов
const STATIC_TEXTS = {
  progress_label: "Прогресс:",
  button_back: "Назад",
  button_next: "Далее",
  submit_button: "Отправить заявку",
  sending: "Отправка...",
  validation_required: "Пожалуйста, выберите или введите ответ.",
  validation_phone_required: "Номер телефона обязателен для связи.",
  contact_title: "Последний шаг: Ваши контакты",
  contact_phone_placeholder: "Телефон (обязательно)",
  contact_email_placeholder: "Email (необязательно)",
  thank_you_title: "Заявка отправлена!",
  thank_you_message:
    "Мы получили ваши ответы. В ближайшее время наш менеджер свяжется с вами по указанному номеру.",
};

const QuestionRenderer: React.FC<{
  question: QuizQuestion;
  answer: string | undefined;
  onChange: (value: string) => void;
}> = ({ question, answer, onChange }) => {
  // 1. Single-choice
  if (question.type === "single-choice" && question.options) {
    return (
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full p-4 border rounded-xl text-left transition-all duration-300 
                            ${
                              answer === option.value
                                ? "bg-indigo-600 text-white shadow-lg border-indigo-700"
                                : "bg-white text-gray-800 hover:bg-indigo-50 border-gray-200"
                            }`}
          >
            {option.label} {/* Используем label напрямую */}
          </button>
        ))}
      </div>
    );
  }

  // 2. Text/Email/Number Input
  if (
    question.type === "text-input" ||
    question.type === "email-input" ||
    question.type === "number-input"
  ) {
    const placeholderText = question.label + "..."; // Используем заголовок как плейсхолдер
    return (
      <input
        type={
          question.type === "email-input"
            ? "email"
            : question.type === "number-input"
            ? "number"
            : "text"
        }
        value={answer || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholderText}
        className="w-full p-4 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    );
  }

  return (
    <p className="text-red-500">Неизвестный тип вопроса: {question.type}</p>
  );
};

export default function Quiz({ questions }: QuizProps) {
  // const t = useTranslations('Quiz'); // УДАЛЕНО
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const totalQuestions = questions.length;
  const totalSteps = totalQuestions + 1;

  const currentQuestion = useMemo(() => {
    return questions[currentStep];
  }, [currentStep, questions]);

  const currentAnswer = answers[currentQuestion?.id] || "";
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  // ... (handleAnswerChange, handlePrev — остаются прежними)

  const handleAnswerChange = useCallback(
    (value: string) => {
      if (currentQuestion) {
        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.id]: value,
        }));
      }
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    const isAnswered =
      currentQuestion?.type === "single-choice"
        ? !!currentAnswer
        : currentAnswer.trim().length > 0;

    if (currentQuestion && currentQuestion.required !== false && !isAnswered) {
      setSubmitMessage({
        success: false,
        message: STATIC_TEXTS.validation_required,
      }); // Используем STATIC_TEXTS
      return;
    }

    setSubmitMessage(null);
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps, currentQuestion, currentAnswer]);

  const handlePrev = useCallback(() => {
    setSubmitMessage(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    const phone = (formData.get("phone") as string).trim();
    const email = (formData.get("email") as string).trim();

    if (!phone) {
      setIsSubmitting(false);
      setSubmitMessage({
        success: false,
        message: STATIC_TEXTS.validation_phone_required,
      }); // Используем STATIC_TEXTS
      return;
    }

    const submissionData = {
      answers: answers,
      phone: phone,
      email: email,
    };

    const result = await submitQuizAction(submissionData);

    setIsSubmitting(false);
    setSubmitMessage(result);

    if (result.success) {
      setCurrentStep(totalSteps + 1);
    }
  };

  // Рендеринг страницы "Спасибо"
  if (currentStep > totalSteps) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-2xl text-center animate-fadeIn">
        <h3 className="text-3xl font-extrabold text-green-600 mb-4">
          🎉 {STATIC_TEXTS.thank_you_title}
        </h3>
        <p className="text-gray-600">{STATIC_TEXTS.thank_you_message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
      {/* Прогресс-бар */}
      <div className="mb-6">
        <div className="text-sm font-medium text-indigo-600 mb-1">
          {STATIC_TEXTS.progress_label} {progressPercent}%
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="min-h-[200px] relative overflow-hidden">
        <div
          key={currentStep}
          className="w-full transition-opacity duration-500 ease-out animate-slideIn"
        >
          {/* РЕНДЕРИНГ ВОПРОСА */}
          {currentQuestion && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                {currentStep + 1}/{totalQuestions}. {currentQuestion.label}{" "}
                {/* Используем label напрямую */}
              </h3>
              <QuestionRenderer
                question={currentQuestion}
                answer={currentAnswer}
                onChange={handleAnswerChange}
              />
            </div>
          )}

          {/* РЕНДЕРИНГ ФИНАЛЬНОГО ШАГА С КОНТАКТАМИ */}
          {currentStep === totalQuestions && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                {STATIC_TEXTS.contact_title}
              </h3>
              <form action={handleSubmit} className="space-y-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder={STATIC_TEXTS.contact_phone_placeholder}
                  required
                  className="w-full p-4 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={STATIC_TEXTS.contact_email_placeholder}
                  className="w-full p-4 border rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting
                    ? STATIC_TEXTS.sending
                    : STATIC_TEXTS.submit_button}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Управление и сообщения */}
      {submitMessage && (
        <p
          className={`mt-4 text-center font-medium ${
            submitMessage.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {submitMessage.message}
        </p>
      )}

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0 || isSubmitting}
          className="flex items-center text-gray-600 hover:text-indigo-600 disabled:opacity-30 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {STATIC_TEXTS.button_back}
        </button>

        {currentStep < totalQuestions && (
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="py-2 px-6 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
          >
            {STATIC_TEXTS.button_next}
          </button>
        )}
      </div>
    </div>
  );
}
