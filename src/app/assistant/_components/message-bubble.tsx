'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatAction } from '@/types'

/** Parse markdown tables into styled HTML. Other formatting is handled inline. */
function formatMarkdown(text: string): string {
  // Split into lines, detect table blocks, convert them to HTML tables
  const lines = text.split('\n')
  const result: string[] = []
  let i = 0

  while (i < lines.length) {
    // Detect table: line with pipes, followed by separator line with dashes
    if (
      i + 1 < lines.length &&
      lines[i].includes('|') &&
      lines[i + 1].includes('|') &&
      /^[\s|:-]+$/.test(lines[i + 1])
    ) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i])
        i++
      }
      result.push(buildTable(tableLines))
      continue
    }

    result.push(formatLine(lines[i]))
    i++
  }

  return result.join('\n')
}

function parseCells(row: string): string[] {
  return row
    .split('|')
    .slice(1, -1)
    .map((c) => c.trim())
}

function buildTable(lines: string[]): string {
  const headers = parseCells(lines[0])
  const bodyRows = lines.slice(2).map(parseCells)

  const ths = headers
    .map(
      (h) =>
        `<th class="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-tight">${formatInline(h)}</th>`
    )
    .join('')

  const rows = bodyRows
    .map(
      (cells) =>
        `<tr class="border-t border-slate-100">${cells
          .map(
            (c) =>
              `<td class="px-3 py-2 text-xs text-slate-700">${formatInline(c)}</td>`
          )
          .join('')}</tr>`
    )
    .join('')

  return `<div class="overflow-hidden rounded-lg border border-slate-200 bg-white my-2"><table class="w-full text-left"><thead class="bg-slate-50"><tr>${ths}</tr></thead><tbody>${rows}</tbody></table></div>`
}

function formatInline(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
}

function formatLine(line: string): string {
  let out = line
  // Headings
  out = out.replace(/^# (.*)/, '<h3 class="text-base font-bold text-slate-900 mt-4 mb-1">$1</h3>')
  out = out.replace(/^## (.*)/, '<h4 class="text-sm font-bold text-slate-900 mt-3 mb-1">$1</h4>')
  out = out.replace(/^### (.*)/, '<h4 class="font-bold text-slate-900 mt-3 mb-1 text-xs uppercase tracking-wide">$1</h4>')
  // Horizontal rule
  out = out.replace(/^---$/, '<hr class="my-3 border-slate-200" />')
  // Blockquotes
  out = out.replace(/^> (.*)/, '<blockquote class="text-xs border-l-2 border-blue-200 bg-blue-50 px-3 py-2 rounded-r my-1">$1</blockquote>')
  // List items (numbered)
  out = out.replace(/^(\d+)\. (.*)/, '<li class="text-xs ml-4 list-decimal">$2</li>')
  // List items (bulleted)
  out = out.replace(/^- (.*)/, '<li class="text-xs ml-4 list-disc">$1</li>')
  // Bold
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
  // Empty lines become breaks
  if (out.trim() === '') out = '<br/>'
  // Wrap non-element lines in a <p>
  if (out && !out.startsWith('<')) out = `<p class="text-sm leading-relaxed">${out}</p>`
  return out
}

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  actions?: ChatAction[]
}

export function MessageBubble({ role, content, actions }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-blue-600 text-white rounded-xl rounded-tr-sm px-4 py-3 text-sm">
          <p>{content}</p>
        </div>
      </div>
    )
  }

  // SECURITY NOTE: content is exclusively from static mock data fixtures
  // defined in src/data/chat-scripts.ts. No user input ever reaches this
  // render path. The formatMarkdown function only processes pre-authored
  // strings that are bundled at build time.
  return (
    <div className="flex justify-start gap-3">
      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="h-3.5 w-3.5 text-blue-600" />
      </div>
      <div className={cn('max-w-[80%] space-y-2')}>
        <div
          className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-4 py-3 shadow-sm prose prose-sm prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
        />
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {actions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-semibold rounded-lg transition-colors',
                  a.variant === 'outline'
                    ? 'px-3 py-1.5 border border-blue-300 text-blue-600 hover:bg-blue-50'
                    : 'text-blue-600 hover:underline'
                )}
              >
                {a.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
