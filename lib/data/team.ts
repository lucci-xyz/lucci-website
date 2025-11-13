/**
 * Team member data
 * Centralized team information
 */

import type { TeamMember } from '@/lib/types'

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    name: 'Natalie',
    email: 'natalie@luccilabs.xyz',
    github: 'https://github.com/natalie-a-1/'
  },
  {
    name: 'Preston',
    email: 'preston@luccilabs.xyz',
    github: 'https://github.com/pdj555'
  }
] as const
