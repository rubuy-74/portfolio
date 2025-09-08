import { useZoom } from '@embedpdf/plugin-zoom/react';
import { useExportCapability } from '@embedpdf/plugin-export/react'
import { Plus } from 'lucide-react'
import { Minus } from 'lucide-react'
import { Download } from 'lucide-react'

export const ZoomToolbar = () => {
	const { provides: zoomProvides, state: zoomState } = useZoom();
	const { provides: exportProvider } = useExportCapability()


	if (!zoomProvides) {
		return null;
	}

	return (
		<div className='flex justify-between border p-3 border-dashed rounded'>
			<div className='flex gap-2'>
				<span>Zoom: {Math.round(zoomState.currentZoomLevel * 100)}%</span>
				<div className='flex justify-center' >
					<button onClick={zoomProvides.zoomOut} className='hover:text-[#b95e3f] hover:cursor-pointer'>
						<Minus />
					</button>
					<button onClick={zoomProvides.zoomIn} className='hover:text-[#b95e3f] hover:cursor-pointer'>
						<Plus />
					</button>
				</div>
			</div>
			<button
				onClick={exportProvider?.download}
				className='hover:text-[#b95e3f] hover:cursor-pointer'
			>
				<Download />
			</button>
		</div >
	);
};
