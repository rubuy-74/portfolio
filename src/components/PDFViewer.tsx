import { useRef } from 'react';
import { EmbedPDF } from '@embedpdf/core/react';
import { usePdfiumEngine } from '@embedpdf/engines/react';
import { createPluginRegistration } from '@embedpdf/core';
import { LoaderPluginPackage } from '@embedpdf/plugin-loader';
import { ViewportPluginPackage } from '@embedpdf/plugin-viewport';
import { ScrollPluginPackage, ScrollStrategy } from '@embedpdf/plugin-scroll';
import { ZoomMode, ZoomPluginPackage } from '@embedpdf/plugin-zoom';
import { TilingPluginPackage } from '@embedpdf/plugin-tiling';
import { RenderPluginPackage } from '@embedpdf/plugin-render';
import { InteractionManagerPluginPackage } from '@embedpdf/plugin-interaction-manager';
import { SelectionPluginPackage } from '@embedpdf/plugin-selection';
import { Viewport } from '@embedpdf/plugin-viewport/react';
import { Scroller } from '@embedpdf/plugin-scroll/react';
import { TilingLayer } from '@embedpdf/plugin-tiling/react';
import { RenderLayer } from '@embedpdf/plugin-render/react';
import {
	GlobalPointerProvider,
	PagePointerProvider,
} from '@embedpdf/plugin-interaction-manager/react';
import { SelectionLayer } from '@embedpdf/plugin-selection/react';

export default function PDFViewer() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { engine, isLoading, error } = usePdfiumEngine();

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (isLoading || !engine) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex h-screen flex-1 flex-col overflow-hidden" ref={containerRef}>
			<div className="flex flex-1 overflow-hidden">
				<EmbedPDF
					engine={engine}
					plugins={[
						createPluginRegistration(LoaderPluginPackage, {
							loadingOptions: {
								type: 'url',
								pdfFile: {
									id: '1',
									url: 'https://rubuy.me/rubem_cv.pdf',
								},
								options: {
									mode: 'full-fetch',
								},
							},
						}),
						createPluginRegistration(ViewportPluginPackage, {
							viewportGap: 10,
						}),
						createPluginRegistration(ScrollPluginPackage, {
							strategy: ScrollStrategy.Vertical,
						}),
						createPluginRegistration(RenderPluginPackage),
						createPluginRegistration(TilingPluginPackage, {
							tileSize: 768,
							overlapPx: 2.5,
							extraRings: 0,
						}),
						createPluginRegistration(ZoomPluginPackage, {
							defaultZoomLevel: ZoomMode.FitPage,
						}),
						createPluginRegistration(InteractionManagerPluginPackage),
						createPluginRegistration(SelectionPluginPackage),
					]}
				>
					{({ pluginsReady }) => (
						<GlobalPointerProvider>
							<Viewport className="h-full w-full flex-1 select-none overflow-auto bg-[#262624]">
								{pluginsReady ? (
									<Scroller
										renderPage={({
											pageIndex,
											scale,
											width,
											height,
											rotation,
											rotatedWidth,
											rotatedHeight,
										}) => (
											<PagePointerProvider
												rotation={rotation}
												scale={scale}
												pageWidth={rotatedWidth}
												pageHeight={rotatedHeight}
												pageIndex={pageIndex}
												style={{
													width,
													height,
												}}
											>
												<RenderLayer pageIndex={pageIndex} className="pointer-events-none" />
												<TilingLayer
													pageIndex={pageIndex}
													scale={scale}
													className="pointer-events-none"
												/>
												<SelectionLayer pageIndex={pageIndex} scale={scale} />
											</PagePointerProvider>
										)}
									/>
								) : (
									<div>Loading plugins...</div>
								)}
							</Viewport>
						</GlobalPointerProvider>
					)}
				</EmbedPDF>
			</div>
		</div>
	);
}
