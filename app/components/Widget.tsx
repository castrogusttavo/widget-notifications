'use client'

import { useState } from 'react'
import { Rocket, X, Check } from 'lucide-react'

interface Notification {
  message: string
  type: string
  time: string
}

export function Widget() {
  const [allSeen, setAllSeen] = useState<boolean>(false)
  const [clickedNotifications, setClickedNotifications] = useState<number[]>([])
  const [checkNotification, setCheckNotification] = useState<boolean>(false)

  const handleMarkAllAsSeen = () => {
    setAllSeen(true)
    setClickedNotifications([])
  }

  const handleNotificationClick = (index: number) => {
    if (clickedNotifications.includes(index)) {
      setClickedNotifications(
        clickedNotifications.filter((item) => item !== index),
      )
    } else {
      setClickedNotifications([...clickedNotifications, index])
    }
  }

  const handleCheckNotification = () => {
    setCheckNotification(true)
  }

  const notifications: Notification[] = [
    {
      message: 'Seu relatório semanal está pronto para revisão.',
      type: 'Relatório',
      time: 'Há 3 minutos',
    },
    {
      message: 'Sua reunião com o cliente foi agendada para amanhã.',
      type: 'Reunião',
      time: 'Há 12 minutos',
    },
  ]

  return (
    <div className="w-[448px] rounded overflow-hidden">
      {/* == Header == */}
      <div className="bg-zinc-200 dark:bg-zinc-800 py-4 px-6 flex items-center justify-between">
        <span className="font-bold">Notificações</span>
        <button
          onClick={handleMarkAllAsSeen}
          className="text-violet-500 font-bold text-xs hover:text-violet-400 uppercase"
        >
          Marcar todas como vistas
        </button>
      </div>

      {/* == Recent Section == */}
      <div>
        <div className="bg-zinc-300 dark:bg-zinc-950 px-5 py-2 font-medium text-sm text-zinc-500 dark:text-zinc-400">
          Recentes
        </div>

        <div className="divide-y-2 divide-zinc-500 dark:divide-zinc-950">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`divide-zinc-200 bg-zinc-200 dark:bg-zinc-900 px-8 py-4 flex items-center self-center gap-6 cursor-pointer`}
              onClick={() => handleNotificationClick(index)}
            >
              <div className="relative">
                {!allSeen && !checkNotification && (
                  <div className="absolute top-[-10px] right-[-10px] w-2 h-2 bg-red-600 rounded-full z-10"></div>
                )}
                <Rocket className="w-6 h-6 text-violet-500" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-100">
                  {notification.message}
                </p>
                <div className="text-xxs text-zinc-400 flex items-center gap-1">
                  <span>{notification.type}</span>
                  <span>{notification.time}</span>
                </div>
              </div>
              {clickedNotifications.includes(index) && !allSeen && (
                <div className="flex gap-2 self-center">
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    <X className="w-3 h-3 text-zinc-50" />
                  </button>
                  <button
                    onClick={handleCheckNotification}
                    className="w-8 h-8 rounded flex items-center justify-center bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
                  >
                    <Check className="w-3 h-3 text-zinc-50" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* == Old Section == */}
      <div>
        <div className="bg-zinc-300 dark:bg-zinc-950 px-5 py-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Antigas
        </div>

        <div className="divide-y-2 divide-zinc-950">
          <div className="divide-zinc-200 bg-zinc-200 dark:bg-zinc-900 px-8 py-4 flex items-center gap-6">
            <Rocket className="w-6 h-6 text-violet-500" />
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm leading-relaxed text-zinc-400">
                Nova atualização disponível para o aplicativo.
              </p>
              <div className="text-xxs text-zinc-400 flex items-center gap-1">
                <span>Atualização</span>
                <span>Há 1 hora</span>
              </div>
            </div>
          </div>

          <div className="divide-zinc-200 bg-zinc-200 dark:bg-zinc-900 px-8 py-4 flex items-center gap-6">
            <Rocket className="w-6 h-6 text-violet-500" />
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm leading-relaxed text-zinc-400">
                Você foi mencionado em um comentário.
              </p>
              <div className="text-xxs text-zinc-400 flex items-center gap-1">
                <span>Menção</span>
                <span>Há 2 horas</span>
              </div>
            </div>
          </div>

          <div className="divide-zinc-200 bg-zinc-200 dark:bg-zinc-900 px-8 py-4 flex items-center gap-6">
            <Rocket className="w-6 h-6 text-violet-500" />
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-sm leading-relaxed text-zinc-400">
                Seu backup foi concluído com sucesso.
              </p>
              <div className="text-xxs text-zinc-400 flex items-center gap-1">
                <span>Backup</span>
                <span>Há 3 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
