import princesasImg from '../assets/cookies_princesas.png'
import safariImg from '../assets/cookies_safari.png'
import navImg from '../assets/cookies_navidad.png'
import babyImg from '../assets/cookies_babyshower.png'
import autosImg from '../assets/cookies_autos.png'
import heroImg from '../assets/cookies_hero.png'

export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'safari', label: 'Safari' },
  { id: 'navidad', label: 'Navidad' },
  { id: 'babyshower', label: 'Baby Shower' },
  { id: 'autos', label: 'Autos & Vehículos' },
  { id: 'flores', label: 'Flores & Mariposas' },
  { id: 'sirenas', label: 'Sirenas & Mar' },
  { id: 'princesas', label: 'Princesas' },
]

export const gallery = [
  {
    id: 1,
    title: 'Set Safari',
    description: 'León, jirafa, elefante y cebra glaseados con detalle premium.',
    image: safariImg,
    category: 'safari',
    tag: 'Muy popular',
  },
  {
    id: 2,
    title: 'Navidad Clásica',
    description: 'Arbolitos, copos de nieve y estrellas navideñas.',
    image: navImg,
    category: 'navidad',
    tag: 'Temporada',
  },
  {
    id: 3,
    title: 'Baby Shower',
    description: 'Mameluco, osito, zapatitos y chupete en pastel.',
    image: babyImg,
    category: 'babyshower',
    tag: 'Personalizable',
  },
  {
    id: 4,
    title: 'Autos & Motos',
    description: 'Vehículos decorados con detalles increíbles.',
    image: autosImg,
    category: 'autos',
    tag: 'Ideal para él',
  },
  {
    id: 6,
    title: 'Princesas',
    description: 'Coronas, castillos y detalles mágicos glaseados para las pequeñas princesas.',
    image: princesasImg,
    category: 'princesas',
    tag: 'Ideal para ella',
  },
  {
    id: 5,
    title: 'Flores & Mariposas',
    description: 'Diseños florales y mariposas con glaseado artístico.',
    image: heroImg,
    category: 'flores',
    tag: 'Romántico',
  },
]
