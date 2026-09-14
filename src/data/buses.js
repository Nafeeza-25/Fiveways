export const buses = [
  {
    id: 'bus-12', number: '12', routeName: 'Cuddalore → IFET',
    stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
    selectedStop: 'Cuddalore', currentSegment: 2, progress: 56,
    status: 'crossed', etaMinutes: -7,
  },
  {
    id: 'bus-18', number: '18', routeName: 'Cuddalore → IFET Express',
    stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
    selectedStop: 'Cuddalore', currentSegment: 0, progress: 18,
    status: 'approaching', etaMinutes: 4,
  },
  {
    id: 'bus-21', number: '21', routeName: 'Cuddalore → IFET',
    stops: ['Cuddalore', 'Nellikuppam', 'Panruti', 'Villupuram', 'IFET'],
    selectedStop: 'Cuddalore', currentSegment: 0, progress: 4,
    status: 'upcoming', etaMinutes: 11,
  },
  {
    id: 'bus-07', number: '07', routeName: 'Panruti → IFET',
    stops: ['Panruti', 'Koliyanur', 'Villupuram', 'IFET'],
    selectedStop: 'Panruti', currentSegment: 0, progress: 8,
    status: 'upcoming', etaMinutes: 9,
  },
  {
    id: 'bus-24', number: '24', routeName: 'Villupuram → IFET',
    stops: ['Villupuram', 'Koliyanur', 'IFET'],
    selectedStop: 'Villupuram', currentSegment: 0, progress: 12,
    status: 'approaching', etaMinutes: 6,
  },
]
