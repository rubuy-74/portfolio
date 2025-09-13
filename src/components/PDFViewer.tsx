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
import { ExportPluginPackage } from '@embedpdf/plugin-export';
import { ZoomToolbar } from './ZoomToolbar'; // 1. Import the toolbar
import { Download } from '@embedpdf/plugin-export/react';
import { TilingPluginPackage } from '@embedpdf/plugin-tiling/react'
import { TilingLayer } from '@embedpdf/plugin-tiling/react';
import {
	ZoomPluginPackage,
	ZoomMode,
} from '@embedpdf/plugin-zoom';

// 1. Register the plugins you need
const plugins = [
	createPluginRegistration(LoaderPluginPackage, {
		loadingOptions: {
			type: 'url',
			pdfFile: {
				id: 'rubem-cv',
				url: 'https://cv.rubuy.me',
			},
		},
	}),
	createPluginRegistration(ViewportPluginPackage),
	createPluginRegistration(ScrollPluginPackage, {
		initialPage: 1,
		pageGap: 0,
	}),
	createPluginRegistration(RenderPluginPackage),
	createPluginRegistration(ZoomPluginPackage, {
		defaultZoomLevel: ZoomMode.FitWidth,
	}),
	createPluginRegistration(ExportPluginPackage),

	createPluginRegistration(TilingPluginPackage, {
		tileSize: 768,
		overlapPx: 5,
		extraRings: 1,
	}),

];

export default function PDFViewer() {
	// 2. Initialize the engine with the Rct hook
	const { engine, isLoading } = usePdfiumEngine();

	if (isLoading || !engine) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				Loading...
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
						className="h-full w-full flex-1 select-none overflow-auto bg-background"
					>
						<Scroller
							renderPage={({ width, height, pageIndex, scale }) => (
								<div style={{ width, height }}>
									<RenderLayer pageIndex={pageIndex} scale={.5} />
									<TilingLayer pageIndex={pageIndex} scale={scale} />
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
