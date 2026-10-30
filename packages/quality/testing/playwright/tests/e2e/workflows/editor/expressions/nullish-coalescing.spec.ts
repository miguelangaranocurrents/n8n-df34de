import { test, expect } from '../../../../../fixtures/base';

test.describe(
	'Nullish coalescing expressions',
	{
		annotation: [{ type: 'owner', description: 'Catalysts' }],
	},
	() => {
		test.beforeEach(async ({ n8n }) => {
			await n8n.start.fromBlankCanvas();
		});

		test('falls back to a grouped logical expression', async ({ n8n }) => {
			await n8n.canvas.addNode('Schedule Trigger');
			await n8n.ndv.setPinnedData([{ id: 1 }]);
			await n8n.ndv.close();

			await n8n.canvas.addNode('Edit Fields (Set)');
			await n8n.ndv.getAssignmentCollectionAdd('assignments').click();
			await n8n.ndv.clickAssignmentExpressionToggle('assignments');

			const input = '{{ [null, 6]?.[0] ?? ([null, 6].last() && 4217) }}';
			const output = '4217';

			await n8n.ndv.clearExpressionEditor();
			await n8n.ndv.typeInExpressionEditor(input);
			await expect(n8n.ndv.getInlineExpressionEditorOutput()).toContainText(output);

			await n8n.ndv.execute();
			await expect(n8n.ndv.getOutputDataContainer()).toBeVisible();
			await expect(n8n.ndv.getOutputDataContainer()).toContainText(output);
		});
	},
);
