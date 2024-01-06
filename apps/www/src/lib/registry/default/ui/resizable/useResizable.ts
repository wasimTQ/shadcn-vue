import { createInjectionState, watchOnce } from '@vueuse/core'
import { reactive, ref } from 'vue'

interface ResizableProps {
  orientation: 'horizontal' | 'vertical'
}

const [useProvideResizable, useInjectResizable] = createInjectionState((props?: ResizableProps) => {
  interface PaneSizeProps {
    min: number | null
    max: number | null
    size: number | null
  }
  const paneInitialSizes = reactive(new Map<symbol, PaneSizeProps>())
  const paneSizes = reactive(new Map<symbol, number>())
  const paneSymbols = ref<symbol[]>([])
  const paneRefs = reactive(new Map<symbol, any>())
  const totalPanes = ref(0)

  function addNewPane(ref: any, key: symbol) {
    paneRefs.set(key, ref)

    const sizeStyle = props?.orientation === 'horizontal' ? ref.style.height : ref.style.width
    const size = Number(sizeStyle.replace('%', ''))
    paneInitialSizes.set(key, {
      size,
      max: ref.maxSizeNumber,
      min: ref.minSizeNumber,
    })

    paneSizes.set(key, size)
    paneSymbols.value.push(key)
    totalPanes.value += 1
  }

  const paneGroupContainerRef = ref<HTMLElement | null>(null)

  function getAllSizes(key: symbol) {
    const initialSize = paneInitialSizes.get(key)
    const currentSize = paneSizes.get(key) ?? 0

    return { min: initialSize?.min ?? 0, max: initialSize?.max ?? 100, size: currentSize }
  }

  function handleKeyDown(ev: KeyboardEvent, index: number) {
    const leftKey = paneSymbols.value[index]
    const rightKey = paneSymbols.value[index + 1]

    const decKey = props?.orientation === 'horizontal' ? 'ArrowUp' : 'ArrowLeft'
    const incKey = props?.orientation === 'horizontal' ? 'ArrowDown' : 'ArrowRight'

    const leftPane = getAllSizes(leftKey)
    const rightPane = getAllSizes(rightKey)

    const step = 0.2

    if (ev.key === incKey) {
      ev.preventDefault()

      if (leftPane.size >= leftPane.max || rightPane.size <= rightPane.min)
        return

      paneSizes.set(leftKey, leftPane.size + step)
      paneSizes.set(rightKey, rightPane.size - step)
    }

    if (ev.key === decKey) {
      ev.preventDefault()

      if (leftPane.size <= leftPane.min || rightPane.size >= rightPane.max)
        return

      paneSizes.set(leftKey, leftPane.size - step)
      paneSizes.set(rightKey, rightPane.size + step)
    }
  }

  watchOnce(paneGroupContainerRef, () => {
    const splitPanesCont = paneGroupContainerRef.value?.querySelector('.splitpanes')
    const allSplitters = splitPanesCont?.querySelectorAll(':scope > .splitpanes__splitter')
    if (!allSplitters)
      return

    for (const [index, splitter] of Object.entries(allSplitters)) {
      splitter.setAttribute('tabindex', '0')
      splitter.addEventListener('keydown', ev => handleKeyDown(ev as KeyboardEvent, Number(index)))
    }
  })

  function setValuesResizedByPointer(payload: PaneSizeProps[]) {
    for (const [index, value] of Object.entries(payload)) {
      const key = paneSymbols.value[Number(index)]
      paneSizes.set(key, Math.round(value.size ?? 0))
    }
  }

  return {
    addNewPane,
    paneGroupContainerRef,
    totalPanes,
    paneSizes,
    setValuesResizedByPointer,
  }
})

function useResizable() {
  const injectableState = useInjectResizable()

  if (!injectableState)
    throw new Error('useResizable should only be used within <Resizable />')

  return injectableState
}

export { useProvideResizable, useResizable }
