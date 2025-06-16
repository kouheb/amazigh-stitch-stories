
export const exportToJSON = (data: any, filename: string) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('JSON export completed successfully');
  } catch (error) {
    console.error('Error exporting JSON:', error);
  }
};

export const exportToCSV = (components: any[], filename: string) => {
  try {
    const headers = ['Element', 'Specs', 'Position', 'Styling'];
    const csvContent = [
      headers.join(','),
      ...components.map(comp => [
        `"${comp.element}"`,
        `"${comp.specs}"`,
        `"${comp.position}"`,
        `"${comp.styling}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('CSV export completed successfully');
  } catch (error) {
    console.error('Error exporting CSV:', error);
  }
};

export const exportToMarkdown = (screen: any, filename: string) => {
  try {
    const markdown = `# ${screen.title}

**Category:** ${screen.category}
**Description:** ${screen.description}

## Layout Specifications
- **Container:** ${screen.layout.container}
- **Dimensions:** ${screen.layout.dimensions}

## Color Palette
${Object.entries(screen.colors).map(([key, value]) => `- **${key}:** ${value}`).join('\n')}

## Components
${screen.components.map((comp: any, index: number) => `
### ${index + 1}. ${comp.element}
- **Specs:** ${comp.specs}
- **Position:** ${comp.position}
- **Styling:** ${comp.styling}
`).join('')}

## Interactions & Behaviors
${screen.interactions.map((interaction: string) => `- ${interaction}`).join('\n')}
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('Markdown export completed successfully');
  } catch (error) {
    console.error('Error exporting Markdown:', error);
  }
};
