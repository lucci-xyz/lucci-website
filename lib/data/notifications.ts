/**
 * Notification data for PhoneNotification component
 * Mock notification data for demonstration
 */

import type { NotificationData } from '@/lib/types'

export const NOTIFICATION_DATA: NotificationData[] = [
  {
    from: '@Mezo',
    amount: '100 mUSD',
    detail: 'Payment received for PR #2451',
    platform: 'Mezo',
    bgColor: '',
    icon: '/mezo.svg',
    needsPadding: false,
    iconSize: 'p-0',
  },
  {
    from: '@Ethereum',
    amount: '3 ETH',
    detail: 'Payment received for PR #1337',
    platform: 'Ethereum',
    bgColor: 'bg-white',
    icon: '/ethereum.svg',
    needsPadding: true,
    iconSize: 'p-3.5',
  },
  {
    from: '@Uniswap',
    amount: '50 SOL',
    detail: 'Payment received for PR #9876',
    platform: 'Uniswap',
    bgColor: 'bg-white',
    icon: '/uniswap.svg',
    needsPadding: true,
    iconSize: 'p-2.5',
  }
]
