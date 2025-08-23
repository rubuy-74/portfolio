import { createPluginRegistration } from '@embedpdf/core';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';

// Import the essential plugins
import { ViewportPluginPackage } from '@embedpdf/plugin-viewport';
import { Viewport } from '@embedpdf/plugin-viewport/react';
import { ScrollPluginPackage } from '@embedpdf/plugin-scroll';
import { Scroller } from '@embedpdf/plugin-scroll/react';
import { LoaderPluginPackage } from '@embedpdf/plugin-loader';
import { RenderPluginPackage } from '@embedpdf/plugin-render';
import { RenderLayer } from '@embedpdf/plugin-render/react';
import { ZoomPluginPackage } from '@embedpdf/plugin-zoom';
import { ExportPluginPackage } from '@embedpdf/plugin-export';
import { ZoomToolbar } from './ZoomToolbar'; // 1. Import the toolbar
import { Download } from '@embedpdf/plugin-export/react';


// 1. Register the plugins you need
const plugins = [
	createPluginRegistration(LoaderPluginPackage, {
		loadingOptions: {
			type: 'url',
			pdfFile: {
				id: 'rubem-cv',
				url: 'https://rubuy.me/rubem_cv.pdf',
			},
		},
	}),
	createPluginRegistration(ViewportPluginPackage),
	createPluginRegistration(ScrollPluginPackage),
	createPluginRegistration(RenderPluginPackage),
	createPluginRegistration(ZoomPluginPackage, {
		defaultZoomLevel: 1.5,
	}),
	createPluginRegistration(ExportPluginPackage),
];

export default function PDFViewer() {
	// 2. Initialize the engine with the React hook
	const { engine, isLoading } = usePdfiumEngine();

	if (isLoading || !engine) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<div className="relative h-16 w-16 animate-spin rounded-full">
					<div className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-white"></div>
				</div>
			</div>
		);
	}

	// 3. Wrap your UI with the <EmbedPDF> provider
	return (
		<div >
			<EmbedPDF engine={engine} plugins={plugins}>
				<div className="flex h-full flex-col">
					<ZoomToolbar />
					< Viewport
						className="h-full w-full flex-1 select-none overflow-auto bg-[#262624]"
					>
						<Scroller
							renderPage={({ width, height, pageIndex }) => (
								<div style={{ width, height }}>
									<RenderLayer pageIndex={pageIndex} />
								</div>
							)}
						/>
					</Viewport>
					<Download />
				</div>
			</EmbedPDF >
		</div >
	);
};
